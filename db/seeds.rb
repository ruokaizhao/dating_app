require "faker"


10.times do
  User.create(
    first_name: Faker::Name.first_name, 
    dob_day: Faker::Number.within(range: 1..30), 
    dob_month: Faker::Number.within(range: 1..12), 
    dob_year: Faker::Number.within(range: 1980..2000), 
    show_gender: Faker::Boolean.boolean, 
    gender_identity: ["man", "woman", "more"].sample, 
    gender_interest: ["man", "woman", "everyone"].sample, 
    email: Faker::Internet.email, 
    url1: "https://source.unsplash.com/user/c_v_r", 
    about: Faker::Quote.most_interesting_man_in_the_world,
    password: "123456",   
    password_confirmation: "123456")
end
