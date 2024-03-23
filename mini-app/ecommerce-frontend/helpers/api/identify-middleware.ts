import { NextRequest } from 'next/server'
import { usersRepo } from '@/helpers/db-repo'

export const identityMiddleware = async (
	req: NextRequest,
	identity: string = 'user',
	isJwt?: boolean,
) => {
	if (!isJwt) {
		throw new Error('jwt required')
	}

	if (identity === 'user' && isJwt) return

	const userId = req.headers.get('userId')
	if (!userId) {
		throw new Error('User not found')
	}

	const user = await usersRepo.getOne({ _id: userId })
	if (!user) {
		throw new Error('User not found')
	}

	if (identity === 'admin' && user.role !== 'admin') {
		throw new Error('No permission for operate')
	}

	if (identity === 'root' && !user.root) {
		throw new Error('No permission to operate, only super administrator can operate')
	}

	req.headers.set('userRole', user.role)
	req.headers.set('userRoot', String(user.root))
}
