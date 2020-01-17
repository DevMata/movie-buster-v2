/*eslint-disable*/

import { TagRepository } from './tag.repository';
import { Test } from '@nestjs/testing';

describe('TagRepository', () => {
  let tagRepo: TagRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TagRepository],
    }).compile();

    tagRepo = module.get<TagRepository>(TagRepository);
  });

  describe('createMultipleTags', () => {
    it('should return an array of tags', async () => {
      const mockTagArray = [{ name: 'tag1' }, { name: 'tag2' }];
      const newTag = { name: 'tag3' };
      const tagArray = ['tag1', 'tag2', 'tag3'];

      tagRepo.find = jest.fn().mockResolvedValue(mockTagArray);
      tagRepo.save = jest.fn().mockResolvedValue([newTag]);

      const tags = await tagRepo.createMultipleTags(tagArray);

      expect(tagRepo.save).toHaveBeenCalledWith([{ name: 'tag3' }]);
      expect(tags).toStrictEqual([...mockTagArray, newTag]);
    });
  });
});
