import { Account, Databases, ID, Models } from 'appwrite'

import client from '../../client'

const account = new Account(client)
const databases = new Databases(client)

/**
 * Ensure an anonymous session. If a session already exists, ignore the error.
 */
export const ensureAnonymousSession =
  async (): Promise<Models.Session | void> => {
    try {
      return await account.createAnonymousSession()
    } catch (error: any) {
      // Ignore an existing anonymous session error
      const isSessionAlreadyExists =
        error?.code === 409 ||
        error?.message === 'user_session_already_exists' ||
        error?.type === 'user_session_already_exists'
      if (isSessionAlreadyExists) {
        return
      }
      throw error
    }
  }

export const addParentQuestionnaire = async (
  data: Record<string, any>,
  studentId: string,
) => {
  return await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID!,
    studentId,
    { parentQuestionnaire: JSON.stringify(data) },
  )
}

export const createStudent = async (data: Record<string, any>) => {
  return await databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID!,
    ID.unique(),
    data,
  )
}

export const createAssessment = async (
  data: Record<string, any>,
  studentId: string,
) => {
  return await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID!,
    studentId,
    { assessment: JSON.stringify(data) },
  )
}
