interface ErrorLike extends Error {}

export class NestedError extends Error {
  private readonly nested: ErrorLike;

  constructor(config: { message?: string; nested: ErrorLike }) {
    const { message = "", nested } = config;

    super(message);

    this.nested = nested;

    Error.captureStackTrace(this, this.constructor);

    const oldStackDescriptor = Object.getOwnPropertyDescriptor(this, "stack");
    const stackDescriptor = this.buildStackDescriptor(
      oldStackDescriptor!,
      nested
    );

    Object.defineProperty(this, "stack", stackDescriptor);
  }

  static buildCombinedStacks(stack: string, nested: ErrorLike) {
    if (nested) {
      stack += "\nCaused By: " + nested.stack;
    }

    return stack;
  }

  buildStackDescriptor(
    oldStackDescriptor: PropertyDescriptor,
    nested: ErrorLike
  ) {
    if (oldStackDescriptor.get) {
      const nested = this.nested;

      const result = {
        get() {
          const stack = oldStackDescriptor.get!.call(this);

          return NestedError.buildCombinedStacks(stack, nested);
        },
      };

      return result;
    }

    const stack = oldStackDescriptor.value;

    const value = NestedError.buildCombinedStacks(stack, nested);

    return { value };
  }
}
