interface ProblemDetails {
    type: string;
    title: string;
    detail: string;
}

function isProblemDetails(error: unknown): error is ProblemDetails {
  const exception = (error as ProblemDetails);
  return exception.type !== undefined &&
         exception.title !== undefined &&
         exception.detail !== undefined;
}

export default async function fetchJson<T = unknown>(...args): Promise<T> {
  try {
    // eslint-disable-next-line no-invalid-this
    const response = await fetch.call(this, ...args);
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error: ProblemDetails = {
      type: response.statusText,
      title: data.title,
      detail: data.detail,
    };
    throw error;
  } catch (error: unknown) {
    if(!isProblemDetails(error)) {
      const defaultError: ProblemDetails = {
        type: 'default',
        title: 'Oops something went wrong',
        detail: JSON.stringify(error)
      };
      throw defaultError;
    } else {
      throw error;
    }
  }
}
