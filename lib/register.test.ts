import { registerUser } from './register'

describe('registerUser', () => {
  const originalOpen = window.open

  afterEach(() => {
    window.open = originalOpen
    jest.restoreAllMocks()
  })

  it('opens WhatsApp URL and returns success', async () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null)

    const result = await registerUser({
      fullname: 'Test User',
      email: 'test@example.com',
      whatsapp: '08123456789',
      referral: 'ABC123',
    })

    expect(result).toEqual({ success: true })
    expect(openSpy).toHaveBeenCalledTimes(1)

    const [calledUrl, calledTarget] = openSpy.mock.calls[0]
    expect(calledTarget).toBe('_blank')
    expect(String(calledUrl)).toContain('https://wa.me/6285846003119?text=')

    const url = new URL(String(calledUrl))
    const text = url.searchParams.get('text') || ''
    expect(text).toContain('Test User')
    expect(text).toContain('test@example.com')
    expect(text).toContain('08123456789')
    expect(text).toContain('ABC123')
  })

  it('omits referral line when referral is not provided', async () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null)

    await registerUser({
      fullname: 'No Ref User',
      email: 'noref@example.com',
      whatsapp: '0812000000',
    })

    const [calledUrl] = openSpy.mock.calls[0]
    const text = new URL(String(calledUrl)).searchParams.get('text') || ''
    expect(text).not.toContain('*Referral:*')
  })

  it('returns error when window.open throws', async () => {
    jest.spyOn(window, 'open').mockImplementation(() => {
      throw new Error('blocked')
    })

    const result = await registerUser({
      fullname: 'Err User',
      email: 'err@example.com',
      whatsapp: '0800000000',
    })

    expect(result).toEqual({
      success: false,
      error: 'Gagal mengirim pesan WhatsApp',
    })
  })
})
