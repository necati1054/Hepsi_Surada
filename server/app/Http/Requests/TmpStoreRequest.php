<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TmpStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return match($this->method()){
            'POST' => $this->store(),
            'PUT', 'PATCH' => $this->update(),
        };
    }

    public function store()
    {
        return[
            'name' => 'string|required',
            'email' => 'email|required',
            'adres' => 'required',
            'tel'=> 'required',
            'user_id' => 'required'
        ];
    }

    public function update()
    {
        return[
            'tmp_store_id' => 'integer|required',
        ];
    }
}
