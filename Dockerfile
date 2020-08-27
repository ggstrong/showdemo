FROM ubuntu:18.04
#设置作者
MAINTAINER hkmcomeon@hotmail.com
# 设置工作目录，下面的RUN命令会在工作目录执行

COPY sources.list /etc/apt/sources.list

RUN  apt-get update && apt-get upgrade -y && apt-get install -y vim && apt-get install -y curl

WORKDIR /app
# 先拷贝本地的 package.json 和 package-lock 到容器内
# 这样是利用docker的镜像分层机制
COPY package*.json ./
# 安装项目依赖包
# 设置淘宝镜像,生产环境可以运行 RUN npm install --only=production 只按照 package.json 中dependencies定义的模块
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && apt-get install -y nodejs && npm config set registry https://registry.npm.taobao.org && npm install --only=production
# 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
ADD . /app/
# 暴露容器内的3000端口
EXPOSE 4000
# 容器启动时执行的命令，类似npm run start
CMD ["npm", "run sit"]
