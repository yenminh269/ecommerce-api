import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts') //routes
export class PostsController {
    constructor(private readonly postsService: PostsService) {}
    @Get() //method
    getPosts() {
        return this.postsService.getPosts();
    }

    @Post()
    createPost(@Body() body: any) { //decorator Body
        return this.postsService.createPost(body);
    }

    @Get(':id')
    getPostById(@Param('id') id: string) { //decorator Params
        return this.postsService.getPostById(id);
    }

    @Put(':id')
    updatePost(@Param('id') id: string, @Body() body: any) {
        return this.postsService.updatePost(id, body);
    }

    @Delete(':id')
    deletePost(@Param('id') id: string) {
        return this.postsService.deletePost(id);
    }

}
