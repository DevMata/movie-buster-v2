import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './repositories/tag.repository';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository])],
  exports: [TypeOrmModule, TagsService],
  providers: [TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
