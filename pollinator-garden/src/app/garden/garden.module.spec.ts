import { GardenModule } from './garden.module';

describe('GardenModule', () => {
  let gardenModule: GardenModule;

  beforeEach(() => {
    gardenModule = new GardenModule();
  });

  it('should create an instance', () => {
    expect(gardenModule).toBeTruthy();
  });
});
