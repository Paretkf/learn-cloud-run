import { ClientSession } from 'mongoose'
import { InternalServerErrorException } from '@nestjs/common'

export const runTransactionWithRetry = async (session: ClientSession, callbackFunc: Function, params) => {
	session.startTransaction()
	let results:any = {}
	try {
		try {
			results = await callbackFunc(params)
		} catch (error) {
			console.log('Caught exception during transaction, aborting.')
			session.abortTransaction()
			throw new Error(error)
		}
		await commitWithRetry(session)
		return results
	} catch (error) {
		throw new  InternalServerErrorException(`Caught exception during transaction, aborting. ${error}`)
	} finally {
		session.endSession()
	}
}

const commitWithRetry = async (session) => {
	while (true) {
		try {
			await session.commitTransaction()
			console.log('Transaction committed.')
			break
		} catch (error) {
			if (error.hasOwnProperty('errorLabels') && error.errorLabels.includes('UnknownTransactionCommitResult') ) {
				console.log('UnknownTransactionCommitResult, retrying commit operation ...')
				continue
			} else {
				console.log('Error during commit ...')
				throw error
			}
		}
	}
}

export const runTransaction = async (session: ClientSession, callbackFunc: Function, params: any) => {
  session.startTransaction()
  try {
    const results = await callbackFunc(params)
    await session.commitTransaction()
		console.log('Transaction committed.')
    return results
  } catch (error) {
    await session.abortTransaction()
    console.log('Error during commit ...')
    throw new InternalServerErrorException(error)
  } finally {
    session.endSession()
  }
}
