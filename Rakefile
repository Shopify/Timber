# Rake tasks to parse sass files

desc 'Parse scss files'
task :sass do
	require 'sass'

	`sass "css/main.scss" "css/main.css"`
	`sass "css/ie.scss" "css/ie.css"`

	puts 'Parsed main.scss and ie.scss'
end

desc 'Build all sass files for deployment'
task build: [:sass]