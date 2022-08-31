<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductsRequest extends FormRequest
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
            'PUT' => $this->update(),
            'DELETE' => $this->destroy(),
        };
    }

    public function update()
    {
        return[
            'store_product_id' => 'integer|required',
            'price' => 'integer|required',
            'stock' => 'integer|required'
        ];
    }
    public function destroy()
    {
        return[
            'store_product_id' => 'integer|required',
        ];
    }
}
