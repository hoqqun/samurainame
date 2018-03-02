task :build_frontend do
  cd "client" do
    sh "yarn install"
    sh "webpack"
  end
end

Rake::Task["assets:precompile"].enhance(%i(build_frontend))