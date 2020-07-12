const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
// TODO: Create an autoscaling object
const autoScaling = new AWS.AutoScaling()

const lcName = 'hamsterLC'
const roleName = 'hamsterLCRole'
const sgName = 'hamster_sg3'
const keyName = 'hamster_key3'

helpers.createIamRole(roleName)
.then(profileArn => createLaunchConfiguration(lcName, profileArn))
.then(data => console.log(data))

function createLaunchConfiguration (lcName, profileArn) {
  // TODO: Create a launch configuration
  const params = {
    IamInstanceProfile: profileArn,
    ImageId: 'ami-075506b2e0a77dcad',
    InstanceType: 't2.micro',
    LaunchConfigurationName: lcName,
    KeyName: keyName,
    SecurityGroups: [
      sgName
    ],
    UserData: 'IyEvYmluL2Jhc2gNCnN1ZG8gYXB0LWdldCB1cGRhdGUNCnN1ZG8gYXB0LWdldCAteSBpbnN0YWxsIGdpdA0KZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9UaG90YUFzaG9rL2hiZmwuZ2l0IC9ob21lL2JpdG5hbWkvaGJmbA0KY2hvd24gLVIgYml0bmFtaTogL2hvbWUvYml0bmFtaS9oYmZsDQpjZCAvaG9tZS9iaXRuYW1pL2hiZmwNCnN1ZG8gbnBtIGkNCnN1ZG8gbnBtIHJ1biBzdGFydA=='
  }

  return new Promise((resolve,reject) => {
    autoScaling.createLaunchConfiguration(params, (err,data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
