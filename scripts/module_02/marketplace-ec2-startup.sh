#!/bin/bash
sudo apt-get update
sudo apt-get -y install git
git clone https://github.com/ThotaAshok/hbfl.git /home/bitnami/hbfl
chown -R bitnami: /home/bitnami/hbfl
cd /home/bitnami/hbfl
sudo npm i
sudo npm run start

# The above commands base64 encoded for entering into UserData
# IyEvYmluL2Jhc2gNCnN1ZG8gYXB0LWdldCB1cGRhdGUNCnN1ZG8gYXB0LWdldCAteSBpbnN0YWxsIGdpdA0KZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9UaG90YUFzaG9rL2hiZmwuZ2l0IC9ob21lL2JpdG5hbWkvaGJmbA0KY2hvd24gLVIgYml0bmFtaTogL2hvbWUvYml0bmFtaS9oYmZsDQpjZCAvaG9tZS9iaXRuYW1pL2hiZmwNCnN1ZG8gbnBtIGkNCnN1ZG8gbnBtIHJ1biBzdGFydA==
# IyEvYmluL2Jhc2gNCnN1ZG8gYXB0LWdldCB1cGRhdGUNCnN1ZG8gYXB0LWdldCAteSBpbnN0YWxsIGdpdA0KZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9yeWFubXVyYWthbWkvaGJmbC5naXQgL2hvbWUvYml0bmFtaS9oYmZsDQpjaG93biAtUiBiaXRuYW1pOiAvaG9tZS9iaXRuYW1pL2hiZmwNCmNkIC9ob21lL2JpdG5hbWkvaGJmbA0Kc3VkbyBucG0gaQ0Kc3VkbyBucG0gcnVuIHN0YXJ0
