<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MainCategoriesRequest extends FormRequest
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
        return match($this->method()){
            'POST' => $this->store(),
            'PUT', 'PATCH' => $this->update(),
            'DELETE' => $this->destroy(),
        };
    }

    public function store()
    {
        return[
            'name' => 'string|required'
        ];
    }

    public function update()
    {
        return[
            'category_id' => 'integer|required',
            'name'=> 'string|required'
        ];
    }
    public function destroy()
    {
        return[
            'category_id' => 'integer|required',
        ];
    }
}
