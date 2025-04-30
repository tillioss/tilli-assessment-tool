import {
  ensureAnonymousSession,
  createParticipant,
  createAssessment,
} from '@/services/appwrite'
import { Account, Databases, ID } from 'appwrite'

describe('appwrite service', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID = 'db'
    process.env.NEXT_PUBLIC_APPWRITE_PARTICIPANTS_COLLECTION_ID = 'participants'
    process.env.NEXT_PUBLIC_APPWRITE_ASSESSMENTS_COLLECTION_ID = 'assessments'
  })

  describe('ensureAnonymousSession', () => {
    it('returns session when createAnonymousSession succeeds', async () => {
      const session = { foo: 'bar' }
      jest
        .spyOn(Account.prototype, 'createAnonymousSession')
        .mockResolvedValue(session as any)
      const result = await ensureAnonymousSession()
      expect(result).toEqual(session)
    })

    it('ignores error when session already exists by code', async () => {
      jest
        .spyOn(Account.prototype, 'createAnonymousSession')
        .mockRejectedValue({ code: 409 })
      const result = await ensureAnonymousSession()
      expect(result).toBeUndefined()
    })

    it('ignores error when session already exists by message', async () => {
      jest
        .spyOn(Account.prototype, 'createAnonymousSession')
        .mockRejectedValue({ message: 'user_session_already_exists' })
      const result = await ensureAnonymousSession()
      expect(result).toBeUndefined()
    })

    it('ignores error when session already exists by type', async () => {
      jest
        .spyOn(Account.prototype, 'createAnonymousSession')
        .mockRejectedValue({ type: 'user_session_already_exists' })
      const result = await ensureAnonymousSession()
      expect(result).toBeUndefined()
    })

    it('throws error for other cases', async () => {
      const error = new Error('unexpected')
      jest
        .spyOn(Account.prototype, 'createAnonymousSession')
        .mockRejectedValue(error)
      await expect(ensureAnonymousSession()).rejects.toThrow('unexpected')
    })
  })

  describe('createParticipant', () => {
    it('calls createDocument with correct parameters and returns value', async () => {
      const data = { a: 1 }
      const mockResult = { id: 'p1' }
      const docSpy = jest
        .spyOn(Databases.prototype, 'createDocument')
        .mockResolvedValue(mockResult as any)
      jest.spyOn(ID, 'unique').mockReturnValue('unique-id')
      const result = await createParticipant(data)
      expect(docSpy).toHaveBeenCalledWith(
        'db',
        'participants',
        'unique-id',
        data,
      )
      expect(result).toBe(mockResult)
    })
  })

  describe('createAssessment', () => {
    it('calls createDocument with correct parameters and returns value', async () => {
      const data = { b: 2 }
      const mockResult = { id: 'a1' }
      const docSpy = jest
        .spyOn(Databases.prototype, 'createDocument')
        .mockResolvedValue(mockResult as any)
      jest.spyOn(ID, 'unique').mockReturnValue('another-id')
      const result = await createAssessment(data)
      expect(docSpy).toHaveBeenCalledWith(
        'db',
        'assessments',
        'another-id',
        data,
      )
      expect(result).toBe(mockResult)
    })
  })
})
