import { afterEach, expect } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'

import { server } from './msw/server.ts'

expect.extend(matchers)

beforeAll(() => {
    server.listen()
})

afterAll(() => {
    server.close()
})

afterEach(() => {
    cleanup()
    server.resetHandlers()
})
