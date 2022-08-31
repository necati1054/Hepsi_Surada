<?php

namespace App\Http\Requests;

use Illuminate\Auth\Events\Login;
use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        if(request("format") == "login"){
            return [
                'email' => 'email|required',
                'password' => 'string|required|min:8',
            ];
        }else if(request("format") == "register"){
            return [
                'name'=>"string|required",
                'email' => 'email|required|unique:users,email',
                'password' => 'string|required|min:8',
            ];
        }
    }
}
