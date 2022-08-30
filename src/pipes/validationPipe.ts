import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    public async transform (value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value
        }
        const object = plainToClass(metatype, value)
        console.log(object, '####################', typeof object.age)
        const errors = await validate(object)
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed')
        }
        return value
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    private toValidate (metatype: Function): boolean {
        // eslint-disable-next-line @typescript-eslint/ban-types
        const types: Function[] = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype)
    }
}
