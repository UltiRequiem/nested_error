export class NestedError extends Error {
  constructor(message, nested) {
    super(message);

    this.nested = nested;

    if (message instanceof Error) {
      nested = message;
    } else if (typeof message !== "undefined") {
      Object.defineProperty(this, "message", {
        value: message,
        writable: true,
        enumerable: false,
        configurable: true,
      });
    }

    Error.captureStackTrace(this, this.constructor);

    const oldStackDescriptor = Object.getOwnPropertyDescriptor(this, "stack");
    const stackDescriptor = buildStackDescriptor(oldStackDescriptor, nested);

    Object.defineProperty(this, "stack", stackDescriptor);
  }
}

function buildStackDescriptor(oldStackDescriptor, nested) {
  if (oldStackDescriptor.get) {
    return {
      get() {
        const stack = oldStackDescriptor.get.call(this);
        return buildCombinedStacks(stack, this.nested);
      },
    };
  }

  const stack = oldStackDescriptor.value;

  return {
    value: buildCombinedStacks(stack, nested),
  };
}

function buildCombinedStacks(stack, nested) {
  if (nested) {
    stack += "\nCaused By: " + nested.stack;
  }

  return stack;
}
