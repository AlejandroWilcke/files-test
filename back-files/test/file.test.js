/* eslint-env mocha */
import { expect } from 'chai'
import { formatFile, parseCSV } from '../src/entities/files/file.service.js'

const inputCSV = 'prop1,prop2,prop3,prop4\nval1,val2,val3,val4'

const mockedParsedCSV = [{
  prop1: 'val1',
  prop2: 'val2',
  prop3: 'val3',
  prop4: 'val4'
}]

describe('[FILES]: ', function () {
  describe('Function parseCSV: ', function () {
    it('debe retornar un array de objetos (lineas) de un CSV', function () {
      const parsedCSV = parseCSV(inputCSV)
      expect(parsedCSV).to.deep.equal(mockedParsedCSV)
    })
  })
  describe('Function formatFile: ', function () {
    it('debe retornar un objeto con el formato de file', function () {
      const mockedFiles = [{
        file: 'test3.csv',
        text: 'oYzuvDKypFzXjDaTCu',
        number: 132692213,
        hex: '8a09cbfb820599d38b955f775039f038'
      }]
      const mockedFormattedFile = {
        file: 'test3.csv',
        lines: [
          {
            text: 'oYzuvDKypFzXjDaTCu',
            number: 132692213,
            hex: '8a09cbfb820599d38b955f775039f038'
          }
        ]
      }
      const formattedFile = formatFile(mockedFiles)
      expect(formattedFile).to.deep.equal(mockedFormattedFile)
    })
    it('debe evitar un file si el campo "number" no es de type number', function () {
      const mockedFiles = [{
        file: 'test3.csv',
        text: 'oYzuvDKypFzXjDaTCu',
        number: '132692213--------------------------------',
        hex: '8a09cbfb820599d38b955f775039f038'
      },
      {
        file: 'test3.csv',
        text: 'oYzuvDKypFzXjDaTCu',
        number: 132692213,
        hex: '8a09cbfb820599d38b955f775039f038'
      }]
      const mockedFormattedFile = {
        file: 'test3.csv',
        lines: [
          {
            text: 'oYzuvDKypFzXjDaTCu',
            number: 132692213,
            hex: '8a09cbfb820599d38b955f775039f038'
          }
        ]
      }
      const formattedFile = formatFile(mockedFiles)
      expect(formattedFile).to.deep.equal(mockedFormattedFile)
    })
    it('debe evitar un file si el campo "hex" no tiene 32 caracteres', function () {
      const mockedFiles = [{
        file: 'test3.csv',
        text: 'oYzuvDKypFzXjDaTCu',
        number: 132692213,
        hex: '8a09c'
      }]
      const formattedFile = formatFile(mockedFiles)
      expect(formattedFile).to.equal(undefined)
    })
  })
})
