import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

const generateSchemaForArray = <T>(models: T[]) => {
  if (!models.length) {
    return {};
  }

  return {
    type: 'array',
    items: { $ref: getSchemaPath(models[0] as any) },
  };
};

const generateSchemaForObj = <T>(model: T) => {
  if (typeof model === 'string') {
    return {
      type: model,
    };
  }

  return {
    $ref: getSchemaPath(model as any),
  };
};

export const ApiSuccessedResponse = <TModel extends Type<any>>(
  model: TModel | TModel[] | string,
  status = 200,
  description = '',
) => {
  const data = Array.isArray(model)
    ? generateSchemaForArray(model)
    : generateSchemaForObj(model);

  return applyDecorators(
    ApiResponse({
      description,
      status,
      schema: {
        properties: {
          data,
        },
      },
    }),
  );
};

export const ApiErroredResponse = <TModel extends Type<any>>(
  model: TModel | TModel[] | string,
  status = 500,
  description = '',
) => {
  let message;
  message = Array.isArray(model)
    ? generateSchemaForArray(model)
    : generateSchemaForObj(model);

  return applyDecorators(
    ApiResponse({
      description,
      status,
      schema: {
        properties: {
          error: {
            type: 'object',
            properties: {
              code: {
                type: 'number',
                default: status,
              },
              message,
            },
          },
        },
      },
    }),
  );
};

export type ApiSuccessedResponseType<T> = { data: T };
export type ApiErroredResponseType<T> = {
  error: {
    code: number;
    message: T;
  };
};

export class ApiResponseModel {
  static success<T>(data: T): ApiSuccessedResponseType<T> {
    return {
      data,
    };
  }

  static error<T>(code: number, message: T): ApiErroredResponseType<T> {
    return {
      error: {
        code,
        message,
      },
    };
  }
}
