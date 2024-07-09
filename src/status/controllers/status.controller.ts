import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  @Get()
  @ApiOperation({ summary: 'Get API status' })
  @ApiResponse({ status: 200, description: 'OK' })
  getStatus(): string {
    return 'OK';
  }
}