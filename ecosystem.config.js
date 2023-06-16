module.exports = {
	apps: [{
		name: 'nodeAxleService',
		script: 'dist/src/main.js', // 要执行的文件
		watch: false,
		autorestart: true, // 出错自动重启
		exec_mode: 'cluster',
		instance: 4,
		max_memory_restart: '1G',
		time: true,
		log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
		// error_file: 'log/error.log', // 错误日志位置
		// out_file: 'log/default.log', // 输出日志文件位置
		// pid_file: 'log/pid.log', // 进程相关文件位置
		env: {
			NODE_ENV: 'development'
		},
		env_dev: {
			NODE_ENV: 'development'
		},
		env_pro: {
			NODE_ENV: 'production'
		}

	}]
}
