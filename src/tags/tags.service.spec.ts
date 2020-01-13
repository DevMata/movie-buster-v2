import { Test } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { TagRepository } from './repositories/tag.repository';

const mockTagRepository = () => ({
  getTags: jest.fn(),
  findTagById: jest.fn(),
  findTagByName: jest.fn(),
});

describe('TagsService', () => {
  let tagsService: TagsService;
  let tagRepository: TagRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TagsService,
        { provide: TagRepository, useFactory: mockTagRepository },
      ],
    }).compile();

    tagsService = await module.get(TagsService);
    tagRepository = await module.get(TagRepository);
  });

  describe('getTags', () => {
    it('gets all tags from repo', () => {
      expect(tagRepository.getTags).not.toHaveBeenCalled();

      tagRepository.getTags();

      expect(tagRepository.getTags).toHaveBeenCalled();
    });
  });

  describe('findTagById', () => {
    it('gets specific tag from repo', () => {
      expect(tagRepository.findTagById).not.toHaveBeenCalled();

      tagRepository.findTagById('asasa');

      expect(tagRepository.findTagById).toHaveBeenCalled();
    });
  });

  describe('findTagByName', () => {
    it('gets specific tag from repo', () => {
      expect(tagRepository.findTagByName).not.toHaveBeenCalled();

      tagRepository.findTagByName('asasa');

      expect(tagRepository.findTagByName).toHaveBeenCalled();
    });
  });
});
