import { rest } from 'msw'

export const handlers = [
    rest.post('*/api/login', (_, response, context) => {
        return response(
            context.status(200),
            context.json({
                token: '12345',
            })
        )
    }),
]
