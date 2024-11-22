const database = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')

class AuthService {
    async login(dto) {
        const usuario = await database.usuarios.findOne({
            attributes: ['id', 'nome', 'etnia', 'estado'],
            where: {
                email: dto.id
            }
        })

        if (!usuario) {
            throw new Error('Usuario não cadastrado')
        }

        const idIguais = await compare(dto.id, usuario.id)

        if (!idIguais) {
            throw new Error('Usuario ou senha invalido')
        }

        const accessToken = sign({
            id: usuario.id,
            nome: usuario.nome
        }, jsonSecret.secret, {
            expiresIn: 86400
        })

        return { accessToken }
        
    }
}

module.exports = AuthService