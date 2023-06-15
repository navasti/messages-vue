const { faker } = require('@faker-js/faker')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs').promises

const MESSAGES_NUMBER = 10000
const OUTPUT_FILE = 'src/data/messages.json'

const generateMessage = () => ({
  id: uuidv4(),
  sender: faker.internet.email(),
  date: faker.date.past().toISOString(),
  title: faker.lorem.sentence({ min: 3, max: 4 }),
  type: Math.random() > 0.5 ? 'message' : 'message-with-attachment',
  content: faker.lorem.paragraph(Math.floor(Math.random() * 10) + 1)
})

const generateMessages = () => [...Array(MESSAGES_NUMBER)].map(() => generateMessage())

const saveMessagesToFile = async (messages) => {
  try {
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(messages))
    return {
      status: 'success'
    }
  } catch (err) {
    console.error(err)
    return {
      status: 'error'
    }
  }
}

;(async () => {
  const messages = generateMessages()
  await saveMessagesToFile(messages)
})()
