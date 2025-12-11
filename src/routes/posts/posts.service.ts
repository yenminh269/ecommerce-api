import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import envConfig from 'src/shared/config';
@Injectable()
export class PostsService {
    constructor(private readonly prismaService: PrismaService) {}
    getPosts() {
        console.log(envConfig.ACCESS_TOKEN_SECRET)
        return this.prismaService.post.findMany({});
    }
    createPost(body: any) {
        const userId = 1;
        return this.prismaService.post.create({ data: {
            title: body.title,
            content: body.content,
            authorId: userId,
        }});
    }
    getPostById(id: string) {
        return `This action returns a #${id} post`;
    }
    updatePost(id: string, body: any) {
        return `This action updates a #${id} post with ${JSON.stringify(body)}`;
    }
    deletePost(id: string) {
        return `This action deletes a #${id} post`;
    }
}
