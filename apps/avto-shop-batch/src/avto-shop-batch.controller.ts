import { Controller, Get, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { BATCH_TOP_AGENTS, BATCH_TOP_PROPERTIES, BATCH_TOP_ROLLBACK } from './lib/config';

@Controller()
export class AvtoShopBatchController {
  private logger: Logger = new Logger('AvtoShopBatchController');
  constructor(private readonly batchService: AvtoShopBatchController) { }

  @Get()
  getHello(): string {
    return this.batchService.getHello();
  }

  @Timeout(1000)
  handleTimeout() {
    this.logger.debug('Batch Server Ready');
  }

  @Cron('00 00 01 * * *', { name: BATCH_TOP_ROLLBACK })
  public async batchRollback() {
    try {
      this.logger['context'] = BATCH_TOP_ROLLBACK;
      this.logger.debug('Ecxecuted');
      await this.batchService.batchRollback();
    } catch (err) {
      this.logger.error('Error on batchRollback:', err)
    }
  }

  @Cron('20 00 01 * * *', { name: BATCH_TOP_PROPERTIES })
  public async batchTopCar() {
    try {
      this.logger['context'] = BATCH_TOP_PROPERTIES;
      this.logger.debug('Ecxecuted');
      await this.batchService.batchTopCar();
    } catch (err) {
      this.logger.error('Error on batchProperties:', err)
    }
  }

  @Cron('40 00 01 * * *', { name: BATCH_TOP_AGENTS })
  public async batchTopAgents() {
    try {
      this.logger['context'] = BATCH_TOP_AGENTS;
      this.logger.debug('Ecxecuted');
      await this.batchService.batchTopAgents();
    } catch (err) {
      this.logger.error('Error on batchAgents:', err)
    }
  }
}
