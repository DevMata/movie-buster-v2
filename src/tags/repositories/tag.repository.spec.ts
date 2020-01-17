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
});
