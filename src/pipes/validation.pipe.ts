import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
// 可以识别校验装饰器数据
import { validate } from 'class-validator'
// 将一个普通js对象转换成指定类的实例
import { plainToClass } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    /**
     *  参数
     * @param value 传入的实际数据
     * @param metatype 元数据，装饰器添加的那些
     */
    public async transform (value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            // 如果没有传入验证规则， 则不验证，直接返回数据
            return value
        }
        // 将对象转换为Class来验证
        const object = plainToClass(metatype, value)
        // console.log(object, '===========')
        const errors = await validate(object) // 同步阻塞，返回检验结果
        if (errors.length > 0) {
            let msg = ''
            let isNo
            if (errors[0].constraints) {
                isNo = Object.keys(errors[0].constraints).join('').includes('is')
                msg = Object.keys(errors[0]?.constraints)[0].slice(2)
            }
            throw new BadRequestException(isNo ? ('The type of ' + `${errors[0]?.property}` + ' should be of a ' + `${msg}`) : `${Object.values(errors[0].constraints)[0]}`)
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
