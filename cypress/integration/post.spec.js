

describe('POST /characters', function () {

    before(function () {
        cy.back2ThePast()
        cy.setToken()
    })

    it('deve cadastrar um personagem', function () {

        const character = {
            name: 'Nome 2',
            alias: 'Apelido 2',
            team: ['time 2.1', 'time 2.2'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })

    })

    context('quando o personagem já existe', function () {

        const character = {
            name: 'Nome 3',
            alias: 'Apelido 3',
            team: [
                'time3.1',
                'time3.2'
            ],
            active: true
        }

        before(function () {
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                })
        })

        it('não deve cadastrar duplicado', function () {
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Duplicate character')
                })
        })
    })

})
