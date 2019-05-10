<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ApiContactController extends Controller
{
    public function index(Request $request)
    {
        return Contact::where('name', 'like', '%'.$request->keywords.'%')->where('name', '<>', '')->get();
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        Contact::create($request->all());

        return response()->json('success', 200);
    }

    public function show($id)
    {
        return Contact::findOrFail($id);
    }

    public function update($id, Request $request)
    {
        $contact = Contact::findOrFail($id);
        $contact->update($request->all());

        return response()->json('success', 200);
    }

    public function delete($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json('success', 200);
    }
}
