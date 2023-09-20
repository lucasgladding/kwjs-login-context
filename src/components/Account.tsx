import { useState } from 'react'

export default function Account() {
    const [name] = useState<string | undefined>('John Smith')
    return <div>{name}</div>
}
