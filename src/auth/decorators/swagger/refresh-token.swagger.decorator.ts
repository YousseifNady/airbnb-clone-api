import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RefreshTokenDto } from '../../dtos/refreh-token.dto';

export function RefreshTokenSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Refresh access token',
            description: 'Generate a new access token using a valid refresh token.',
        }),

        ApiBody({
            type: RefreshTokenDto,
        }),

        ApiOkResponse({
            description: 'Access token refreshed successfully.',
        }),

        ApiBadRequestResponse({
            description: 'Invalid request data.',
        }),

        ApiUnauthorizedResponse({
            description: 'Invalid or expired refresh token.',
        }),
    );
}