import { Body, Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Controller('auth')
export class AuthController {
	constructor (
        private readonly jwtService: JwtService
	) {
	}

    @Post('login')
	public async login (@Body() body): Promise<any> {
		return {
			status: 200,
			token: this.jwtService.sign(body)
		}
	}

    @Post('logout')
    public async logout (@Body() body): Promise<any> {
        console.log(body, '=====#############======')
    	return {
            status: 200,
    		data: 'success'
        }
    }
}
