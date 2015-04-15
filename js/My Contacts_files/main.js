var will_contact = document.createElement('div');
will_contact.setAttribute('class', 'well');
var will_name = document.createElement('p');
will_name.innerHTML = "<h3>Will Ferrell</h3>";
var will_profile = document.createElement('img');
will_profile.src = "https://espnfivethirtyeight.files.wordpress.com/2015/03/51007157fm003_mtvtrl.jpg?w=610";
will_profile.setAttribute('class', 'profile')
will_contact.appendChild(will_name);
will_contact.appendChild(will_profile);

var container = document.createElement('div');
container.setAttribute('class', 'container');
container.appendChild(will_contact);
document.body.appendChild(container);