// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const ec2 = new AWS.EC2()
const sgName = 'hamster_sg3'
const keyName = 'hamster_key3'

// Do all the things together
createSecurityGroup(sgName)
.then(() => {
  return createKeyPair(keyName)
})
.then(helpers.persistKeyPair)
.then(() => {
  return createInstance(sgName, keyName)
})
.then((data) => {
  console.log('Created instance with:', data)
})
.catch((err) => {
  console.error('Failed to create instance with:', err)
})

// Create functions

function createSecurityGroup (sgName) {
  const params = {
    Description: sgName,
    GroupName: sgName
  }

  return new Promise((resolve, reject) => {
    ec2.createSecurityGroup(params, (err, data) => {
      if (err) reject(err)
      else {
        const params = {
          GroupId: data.GroupId,
          IpPermissions: [
            {
              IpProtocol: 'tcp',
              FromPort: 22,
              ToPort: 22,
              IpRanges: [
                {
                  CidrIp: '0.0.0.0/0'
                }
              ]
            }, {
              IpProtocol: 'tcp',
              FromPort: 3000,
              ToPort: 3000,
              IpRanges: [
                {
                  CidrIp: '0.0.0.0/0'
                }
              ]
            }
          ]
        }
        ec2.authorizeSecurityGroupIngress(params, (err) => {
          if (err) reject(err)
          else resolve()
        })
      }
    })
  })
}

function createKeyPair (keyName) {
  const params = {
    KeyName: keyName
  }

  return new Promise((resolve, reject) => {
    ec2.createKeyPair(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function createInstance (sgName, keyName) {
  const params = {
    ImageId: 'ami-08ba11ddaf315ca63', // ami-09d95fab7fff3776c',
    InstanceType: 't2.micro',
    KeyName: keyName,
    MaxCount: 1,
    MinCount: 1,
    SecurityGroups: [
      sgName
    ],
    UserData: 'IyEvYmluL2Jhc2gNCnN1ZG8gYXB0LWdldCB1cGRhdGUNCnN1ZG8gYXB0LWdldCAteSBpbnN0YWxsIGdpdA0KZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9UaG90YUFzaG9rL2hiZmwuZ2l0IC9ob21lL2JpdG5hbWkvaGJmbA0KY2hvd24gLVIgYml0bmFtaTogL2hvbWUvYml0bmFtaS9oYmZsDQpjZCAvaG9tZS9iaXRuYW1pL2hiZmwNCnN1ZG8gbnBtIGkNCnN1ZG8gbnBtIHJ1biBzdGFydA=='
    // UserData: 'IyEvYmluL2Jhc2gNCmN1cmwgLS1zaWxlbnQgLS1sb2NhdGlvbiBodHRwczovL3JwbS5ub2Rlc291cmNlLmNvbS9zZXR1cF8xMi54IHwgc3VkbyBiYXNoIC0NCnN1ZG8geXVtIGluc3RhbGwgLXkgbm9kZWpzDQpzdWRvIHl1bSBpbnN0YWxsIC15IGdpdA0KZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9UaG90YUFzaG9rL2hiZmwuZ2l0DQojIGdpdCBjbG9uZSBodHRwczL2ovdpdGh1Yi5jb20vcnlhbm11cmFrYW1pL2hiZmwuZ2l0DQpjZCBoYmZsDQpucG0gaQ0KbnBtIHJ1biBzdGFydA=='
    // UserData: 'IyEvYmluL2Jhc2gNCnN1ZG8gYXB0LWdldCB1cGRhdGUNCnN1ZG8gYXB0LWdldCAteSBpbnN0YWxsIGdpdA0KZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9yeWFubXVyYWthbWkvaGJmbC5naXQgL2hvbWUvYml0bmFtaS9oYmZsDQpjaG93biAtUiBiaXRuYW1pOiAvaG9tZS9iaXRuYW1pL2hiZmwNCmNkIC9ob21lL2JpdG5hbWkvaGJmbA0Kc3VkbyBucG0gaQ0Kc3VkbyBucG0gcnVuIHN0YXJ0'
  }

  return new Promise((resolve, reject) => {
    ec2.runInstances(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
