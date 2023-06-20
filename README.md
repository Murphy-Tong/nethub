### 这是一个方法注解收集器，所有参数全部都会收集到 [user-content-requestConfig](#requestConfig) 中。与网络请求库搭配实现网络请求。达到仅定义请求关键信息就可以发起请求的目的。

## 注解

一共提供三类注解：类注解，方法注解，方法参数注解

### 类注解

| 注解                       | 说明                                        | 访问方式              |
| -------------------------- | ------------------------------------------- | --------------------- |
| Service(baseURL) / Service | 标记此 class 需要处理；参数为域名，可不填写 | requestConfig.baseURL |

eg:

```typescript
@Service("http://www.baidu.com")
class Api {}

@Service
class Api {}
```

### 方法注解

| 注解                 | 说明                     | 访问方式                                     |
| -------------------- | ------------------------ | -------------------------------------------- |
| POST(path)           | 定义请求方式以及请求路径 | requestConfig.method,<br/>requestConfig.path |
| GET(path)            | 同上                     | 同上                                         |
| PUT(path)            | 同上                     | 同上                                         |
| DELETE(path)         | 同上                     | 同上                                         |
| HEAD(path)           | 同上                     | 同上                                         |
| METHOD(method,path) | 同上                     | 同上                                         |
| Header([key1,value1,key2,value2,...])  | 添加请求头               | requestConfig.headers                     |

eg:

```typescript
@Service("http://www.baidu.com")
class Api {
  @POST("/api/xxx")
  getName(@QueryMap data: { key: string }): Promise<string> {
    throw new Error();
  }
  @METHOD({ path: "/api/xxx", method: "GET" })
  getName(@QueryMap data: { key: string }): Promise<string> {
    throw new Error();
  }
}
```

### 方法参数注解

| 注解        | 说明                                                    | 访问方式               |
| ----------- | ------------------------------------------------------- | ---------------------- |
| Query(key)  | 定义一个 http query 参数，key 要 通过参数传入           | requestConfig.params   |
| QueryMap    | 同上，定义多个 query 参数，                             | 同上                   |
| Field(key)  | 定义一个 http post body 对象的参数，key 要 通过参数传入 | 同上                   |
| FieldMap    | 同上，定义多个 post body 参数                           | 同上                   |
| Header(key) | 同上，定义请求 header 参数                              | requestConfig。headers |

可以同时使用多种注解，key 相同时，后面参数的优先级会更高

eg: 下面两种效果是一样的

```typescript
@Service("http://www.baidu.com")
class Api {
  @POST("/api/xxx")
  getName(@QueryMap data: { key: string }): Promise<string> {
    throw new Error();
  }

  @METHOD({ path: "/api/xxx", method: "POST" })
  getName(@Query("key") data: string): Promise<string> {
    throw new Error();
  }
}
```

## 处理收集到的参数，发起请求 <a id='requestConfig'></a>

```typescript
const api = new NetHub()
  .setClient({
    execute(requestConfig) {
      // 在这里可以获取到方法执行时拿到的所有注解以及参数，处理request参数然后发起请求
      return axios.request(requestConfig);
    },
  })
  .create(Api);
```

## 扩展自定义注解

针对三类注解（类，方法，参数），以及注解使用时是否可以传递参数，共有六种扩展方式。但都大同小异，这里以方法注解为例：

1. 继承 NetHubMethodDecorator 基类，类泛型为 注解 有参数时，参数的类型
2. 重写对应的方法，收集注解参数以及方法参数
   2.1 注解没有参数：重写 collectMethod 方法 ，返回一个闭包。闭包的 第一个 值为本次请求的 requestConfig，返回一个 requestConfig
   2.2 注解有参数：重写 collectMethodWithValue 方法，方法的第一个参数为注解使用时的参数，返回值同上

3. 注册 注解
   export const NO_AUTH = new NoAuthDecor().regist();

eg:

```typescript
/**
 * 标记为不需要token
 */
class NoAuthDecor extends NetHubMethodDecorator<string> {
  collectMethod() {
    return function (requestConfig: HttpRequestConfig) {
      requestConfig.clientConfig = requestConfig.clientConfig || {};
      requestConfig.clientConfig.noAuth = true;
      return requestConfig;
    };
  }

  collectMethodWithValue(value: string): NetHubInterpreter {
    return function (config: HttpRequestConfig) {
      config.clientConfig = config.clientConfig || {};
      config.clientConfig.noauth = true;
      return config;
    };
  }
}
export const NO_AUTH = new NoAuthDecor().regist();
```

扩展对应表
| 注解位置 | 扩展基类 | 重写方法 | 返回值 |
| - | - | - | - |
| 类 | NetHubClassDecorator | collectClass , collectClassWithValue | NetHubInterpreter|
| 方法 | NetHubMethodDecorator | collectMethod , collectMethodWithValue | NetHubInterpreter|
| 方法参数 | NetHubFieldDecorator | collectField , collectFieldWithValue | NetHubInterpreter|

注⚠️：类注解 需要 传递参数时，需要通过 registWithValue 方法 注册注解 ，与其他两种注解的注册方式不同

NetHubInterpreter 签名：
```typescript
/**
 * currentRequestConfig : 本次方法调用时注解收集到的参数对象集合，包含类，方法，参数注解
 * argumentValue ：注解可传参数时传递的参数，只有 collectXXXWithValue 方法返回的才会有这个参数，
 * targetServiceConstructor : class 构造对象,
 * methodName : 方法名 ，方法注解有此参数
 * argumentIndex ： 当前处理的参数位置
 */
(currentRequestConfig: HttpRequestConfig, argumentValue: any, targetServiceConstructor: object, methodName: string | Symbol, argumentIndex?: number): HttpRequestConfig | Promise<HttpRequestConfig>;

```

需要重写的方法的签名：
```typescript

    collectClass(cls: object): NetHubInterpreter;
    /**
     * value : 注解使用是传过来的参数值
     */
    collectClassWithValue(value: V, cls: object): NetHubInterpreter;
    collectMethod(target: Object, methodName: string): NetHubInterpreter;
    /**
     * value : 注解使用是传过来的参数值
     */
    collectMethodWithValue(value: V, target: Object, methodName: string): NetHubInterpreter;
    collectField(target: Object, methodName: string, parameterIndex: number): NetHubInterpreter;
    /**
     * value : 注解使用是传过来的参数值
     */
    collectFieldWithValue(value: V, target: Object, methodName: string, parameterIndex: number): NetHubInterpreter;

```
