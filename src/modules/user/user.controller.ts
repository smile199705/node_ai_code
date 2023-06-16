import { Body, Controller, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { TestDto } from '../../pipes/user/testDto'
import { Logger } from '../../loggers/log4js'
import { AuthGuard } from '@nestjs/passport'

// @UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
	constructor (
      private readonly userService: UserService
	) {}
  @Get('test')
	public async test (@Query() testDto: TestDto): Promise<any> {
		const res = await this.userService.testDemo()
		// Logger.warn('测试的')
		return res
	}


  @Get('userInfo')
  public async userInfo () {
  	const userInfo = {
  		id: 'admin',
  		role: 'admin',
  		name: '难凉热血',
  		avatar: 'https://s1.ax1x.com/2020/04/28/J5hUaT.jpg',
  		description: '拥有系统内所有菜单和路由权限'
  	}
  	return {
  		status: 200,
  		userInfo
  	}
  }

  @Get('list')
  public async list (): Promise<any> {
  	return {
  		'status': 200,
  		'users': [
  			{
  				'id': 'admin',
  				'role': 'admin',
  				'name': 'smile',
  				'avatar': 'https://s1.ax1x.com/2020/04/28/J5hUaT.jpg',
  				'description': '拥有系统内所有菜单和路由权限'
  			},
  			{
  				'id': 'editor',
  				'role': 'editor',
  				'name': '编辑员',
  				'avatar': 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  				'description': '可以看到除户管理页面之外的所有页面'
  			},
  			{
  				'id': 'guest',
  				'role': 'guest',
  				'name': '游客',
  				'avatar': 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  				'description': '仅能看到Dashboard、作者博客、权限测试和关于作者四个页面'
  			}
  		]
  	}
  }

}
