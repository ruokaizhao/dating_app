class UserMailer < ApplicationMailer
    default from: 'zhaozrk@gmail.com'
  
    def password_reset_email
      @user = params[:user]
      @token = params[:token]
      @url  = "http://localhost:4000/reset-password/#{@token}"
      mail(to: @user.email, subject: 'Password reset instructions')
    end  
  
  end
  