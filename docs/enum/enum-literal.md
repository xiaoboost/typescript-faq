# 枚举与字面量的差异

在 TypeScript / JavaScript 语言中，广义上的枚举类型其实就是指若干特定的常量。比如说我们常常在代码中使用的常量：

```javascript
const left = 'left';
const right = 'right';
const down = 'down';
```

它们就可以称作是广义上的枚举类型了。到了 TypeScript 语言中，单独把枚举类型拿了出来作为基本的数据结构，那么`枚举`和`常量`区别在哪里呢？

## 字符串枚举和字符串字面量

```typescript
enum Direction {
  left = 'left',
  right = 'right',
  up = 'up',
  down = 'down',
}

function setDirection1(di: Direction) {
  // ..
}

function setDirection2(di: 'left' | 'right' | 'up' | 'down') {
  // ..
}

setDirection1('left');        // error
setDirection1(Direction.left);

setDirection2('left');
setDirection2(Direction.left);
```

上述的代码中可以看到，字符串枚举的类型检测要更为严格，必须是枚举变量本身，而字符串字面量类型则兼容性更好，值相同的字符串枚举也是可以的。

## 数字枚举和数字字面量

```typescript
enum Direction {
  left = 0,
  right,
  up,
  down,
}

function setDirection1(di: Direction) {
  // ..
}

function setDirection2(di: 0 | 1 | 2 | 3) {
  // ..
}

/* 以下四个函数均未报错 */

setDirection1(2);
setDirection1(Direction.left);

setDirection2(0);
setDirection2(Direction.left);
```

很明显可以看出数字和字符串最大的不同就是数字枚举的类型检测没有字符串那么严格，只要实际的值相等，那就可以兼容。

## 枚举和字面量的取舍

不管是枚举还是字面量常量，基本都是在各种状态量中使用，这类状态量都有个特点，就是其实它们并不关心这个状态值是多少，只需要能表示不同的状态就可以了。比如下面的情况：

```typescript
enum Direction {
  left,
  right,
  up,
  down,
}

function setDirection1(di: Direction) {
  switch (di) {
    case Direction.left: {
      // ..
    }
    case Direction.right: {
      // ..
    }
    case Direction.up: {
      // ..
    }
    case Direction.down: {
      // ..
    }
  }
}

function setDirection2(di: 'left' | 'right' | 'up' | 'down') {
  switch (di) {
    case 'left': {
      // ..
    }
    case 'right': {
      // ..
    }
    case 'up': {
      // ..
    }
    case 'down': {
      // ..
    }
  }
}
```

在上面的代码中，用于表示方向的状态量`di`在两种逻辑中都是成立的，因为我们实际上并不关心`di`的值到底是多少，我们只需要能区分开四种状态就行了。在这个意义上来说，内部的状态量我是推荐使用数字枚举的。因为对于程序来说，数字和字符串这两者，肯定是前者的内存要更小点，而且数字枚举是使用对象来实现的，对象字段名字也具有可读性，所以字面量在这方面的优势也不存在了。

那么字面量就一无是处了嘛？也不是的，因为对于状态量而言，我们不关心枚举的具体值是多少，就意味着我们每次使用枚举的时候都必须要拿到枚举的原始对象，因为你并不清楚枚举值是否发生了改变。这就导致两段代码会因为这个枚举而耦合到一起。当你这个枚举状态到处都在用的时候，就非常有可能导致模块的耦合度过高，而很难分割。而对于字面量来说，由于它的值就是它的状态，所以两个模块是可以做到完全分离的。

这两者并非是非此即彼的，判断好自己所处的情况，选择最好的方式就行。不过在具体的代码实践中，一般是推荐，在项目的内部模块中使用数字枚举，而在对外提供的接口中使用字符串字面量。
