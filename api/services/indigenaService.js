const database = require('../models')
const { hash } = require('bcryptjs')
const uuid = require('uuid')

class UsuarioService {
    async cadastrar(dto) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: dto.id
            }
        })

        if (usuario) {
            throw new Error('Usuario ja cadastrado')
        }

        try { 
    
            const novoUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                etnia: dto.etnia,
            })
    
            return novoUsuario
        } catch (error) {
            throw new Error('Erro ao cadastrar usuario')
        }


    }

    async buscarTodosUsuarios() {
        const usuarios = await database.usuarios.findAll()

        return usuarios
    }

    async buscarUsuarioPorId(id) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: id
            }
        })

        if (!usuario) {
            throw new Error('Usuario informado não cadastrado!')
        }

        return usuario
    }

    async editarUsuario(dto) {
        const usuario = await this.buscarUsuarioPorId(dto.id)

        try {
            usuario.nome = dto.nome
            usuario.id = dto.id

            await usuario.save()

            return usuario
        } catch (error) {
            throw new Error('Erro ao editar usuario!')
        }
    }

    async deletarUsuario(id) {
        await this.buscarUsuarioPorId(id)

        try {
            await database.usuarios.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar deletar o usuario!')
        }
    }
}

module.exports = UsuarioService