task :build_frontend do
  cd "client" do
    sh "npm install"
    sh "npm run build"
  end
end

Rake::Task["assets:precompile"].enhance(%i(build_frontend))