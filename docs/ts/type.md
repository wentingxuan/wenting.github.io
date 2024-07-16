`TypeScript` 是一种基于 `JavaScript` 的类型编程语言， 提供了严格的类型检查机制和类型推导能力，`类型`是`Typescript`的核心与难点

**`keyof 索引查询`**

对应任何类型T,`keyof` `T` 的结果为该类型上所有公有属性`key`的联合：

```typescript
interface Eg1 {
  name: string,
  readonly age: number,
}
// T1的类型实则是name | age
type T1 = keyof Eg1

class Eg2 {
  private name: string;
  public readonly age: number;
  protected home: string;
}
// T2实则被约束为 age
// 而name和home不是公有属性，所以不能被keyof获取到
type T2 = keyof Eg2

```

