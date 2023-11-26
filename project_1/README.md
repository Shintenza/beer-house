# BeerHouse - static website using plain HTML/CSS and JS

![project_preview](./page_preview.png)

## Used technologies
|  Technology   | Purpose       |
| ------------- | ------------- |
|  HTML5        | content structure and organization; markup language  |
|  CSS          | look and feel; responsive design  |
|  JS           | contact form handling, animations, mobile hamburger menu, image carousels |
|  [FormSubmit](https://formsubmit.co/) | backend API responsible for sending emails |

## Starting a project
This is a simple static website so you can clone the repository and open `index.html` file using your favourite browser. With this approach you wouldn't be able to use
the contact form it requires to run the project on a server. 
To solve this problem you can use tool like `serve`; all you need to do is to navigate to the cloned repo and run:

> sudo npm install -g serve
> serve .

After doing it you can visit the site on `localhost:3000`. Also remember to change the `DESTINATION_ADDRESS` variable in the `contact.js` file to your email that is going
to receive messages from the contact from.
