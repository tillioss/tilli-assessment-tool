import {
  ensureAnonymousSession,
  createAssessment,
  createStudent,
  addParentQuestionnaire,
} from '@/services/appwrite'
import { Account, Databases, ID } from 'appwrite'

describe('appwrite service', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID = 'db'
    process.env.NEXT_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID = 'students'
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

  describe('createAssessment', () => {
    it('calls updateDocument with correct parameters and returns value', async () => {
      const data = { b: 2 }
      const studentId = 'student-123'
      const mockResult = { id: 'a1' }
      const docSpy = jest
        .spyOn(Databases.prototype, 'updateDocument')
        .mockResolvedValue(mockResult as any)
      const result = await createAssessment(data, studentId)
      expect(docSpy).toHaveBeenCalledWith('db', 'students', studentId, {
        assessment: JSON.stringify(data),
      })
      expect(result).toBe(mockResult)
    })
  })

  describe('createStudent', () => {
    it('calls createDocument with correct parameters and returns value', async () => {
      const data = { studentName: 'John', school: 'ABC School' }
      const mockResult = { id: 'student-123' }
      const docSpy = jest
        .spyOn(Databases.prototype, 'createDocument')
        .mockResolvedValue(mockResult as any)
      jest.spyOn(ID, 'unique').mockReturnValue('student-123')
      const result = await createStudent(data)
      expect(docSpy).toHaveBeenCalledWith('db', 'students', 'student-123', data)
      expect(result).toBe(mockResult)
    })
  })

  describe('addParentQuestionnaire', () => {
    it('calls updateDocument with correct parameters and returns value', async () => {
      const data = { childName: 'Jane', parentName: 'John' }
      const studentId = 'student-123'
      const mockResult = { id: 'student-123' }
      const docSpy = jest
        .spyOn(Databases.prototype, 'updateDocument')
        .mockResolvedValue(mockResult as any)
      const result = await addParentQuestionnaire(data, studentId)
      expect(docSpy).toHaveBeenCalledWith('db', 'students', studentId, {
        parentQuestionnaire: JSON.stringify(data),
      })
      expect(result).toBe(mockResult)
    })
  })
})
