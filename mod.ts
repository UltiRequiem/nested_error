export class NestedError extends Error {
  private readonly nested: Error;

  constructor(config: { message?: string; nested: Error }) {
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

  static buildCombinedStacks(stack: string, nested: Error) {
    if (nested) {
      stack += "\nCaused By: " + nested.stack;
    }

    return stack;
  }

  buildStackDescriptor(oldStackDescriptor: PropertyDescriptor, nested: Error) {
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
